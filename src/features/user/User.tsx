import { useUserQuery, useUserMutations } from './services/user.query';
import { Button } from '../../components/ui/Button';
import { useUserStore } from './store/useUserStore';
import { UserTable } from './UserTable';
import { UserForm } from './UserForm';
import { useState } from 'react';

export const User = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useUserQuery(page);
  const { create, update, remove } = useUserMutations();

  const users = data?.users || [];
  const total = data?.total || 0;

  const { isModalOpen, openModal, closeModal, selectedUser, setSelectedUser } = useUserStore();

  const handleFormSubmit = (values: any) => {
    if (selectedUser) {
      update.mutate(
        { ...selectedUser, ...values }, 
        { 
          onSuccess: () => {
            closeModal();
            setSelectedUser(null);
          } 
        }
      );
    } else {
      create.mutate(values, { 
        onSuccess: () => closeModal() 
      });
    }
  };

  const handleEditClick = (user: any) => {
    setSelectedUser(user);
    openModal();
  };

  const handleDeleteClick = (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      remove.mutate(id);
    }
  };

  if (isLoading) return (
    <div className="flex justify-center items-center p-20">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      <span className="ml-3 font-medium text-slate-600">Fetching users...</span>
    </div>
  );

  if (isError) return (
    <div className="p-10 text-center text-red-500 bg-red-50 rounded-lg m-6 border border-red-100">
      <p className="font-bold">Error Loading Data</p>
    </div>
  );

  return (
    <div className="p-1">
      <div className="flex justify-between items-center bg-white p-6 border-b border-slate-100">
        <div></div>
        <Button onClick={() => { setSelectedUser(null); openModal(); }}>
          + Add User
        </Button>
      </div>

      <div className="p-6">
        <UserTable 
          users={users} 
          totalUsers={total}
          currentPage={page}
          onPageChange={(newPage) => setPage(newPage)}
          onEdit={handleEditClick} 
          onDelete={handleDeleteClick} 
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
             <div className="p-6 border-b bg-slate-50 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800">
                  {selectedUser ? 'Edit Profile' : 'Add New Member'}
                </h2>
                <button 
                  onClick={closeModal} 
                  className="text-slate-400 hover:text-slate-600 text-2xl leading-none transition"
                >
                  &times;
                </button>
             </div>
             
             <UserForm 
               onSubmit={handleFormSubmit} 
               isSubmitting={create.isPending || update.isPending} 
             />
          </div>
        </div>
      )}
    </div>
  );
};