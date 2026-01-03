import type { User } from "./schema/user.interface";

interface Props {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  currentPage: number;
  totalUsers: number;
  onPageChange: (page: number) => void;
}

export const UserTable = ({ users, onEdit, onDelete, currentPage, totalUsers, onPageChange }: Props) => {
  const limit = 10;
  const totalPages = Math.ceil(totalUsers / limit);
  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold border-b">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Email</th>
              <th className="p-4">Age</th>
              <th className="p-4">Address</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users?.map((user) => (
              <tr key={user.id} className="hover:bg-blue-50/30 transition-colors">
                <td className="p-4 font-medium text-gray-800">{user.firstName} {user.lastName}</td>
                <td className="p-4 text-gray-600">{user.email}</td>
                <td className="p-4 text-gray-500">{user.age || '—'}</td>
                <td className="p-4 text-gray-500 truncate max-w-[150px]">
                   {typeof user.address === 'object' ? user.address.address : user.address || '—'}
                </td>
                <td className="p-4 flex justify-center gap-3">
                  <button onClick={() => onEdit(user)} className="text-blue-600 hover:text-blue-800 font-semibold text-sm">Edit</button>
                  <button onClick={() => onDelete(user.id)} className="text-red-500 hover:text-red-700 font-semibold text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-sm text-gray-600 font-medium">
          Showing <span className="text-blue-600">{users.length}</span> of {totalUsers} users
        </span>
        
        <div className="flex items-center gap-1">
          <button 
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="p-2 border rounded-md bg-white disabled:opacity-30 hover:bg-gray-50 transition-all"
          >
            &larr;
          </button>

          {currentPage > 3 && (
            <>
              <button onClick={() => onPageChange(1)} className="px-3 py-1.5 border rounded-md bg-white hover:bg-gray-100">1</button>
              <span className="px-1 text-gray-400">...</span>
            </>
          )}

          {pages.map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`px-3 py-1.5 border rounded-md transition-all font-semibold ${
                currentPage === p 
                ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105' 
                : 'bg-white text-gray-600 hover:border-blue-400 hover:text-blue-600'
              }`}
            >
              {p}
            </button>
          ))}

          {currentPage < totalPages - 2 && (
            <>
              <span className="px-1 text-gray-400">...</span>
              <button onClick={() => onPageChange(totalPages)} className="px-3 py-1.5 border rounded-md bg-white hover:bg-gray-100">{totalPages}</button>
            </>
          )}

          <button 
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="p-2 border rounded-md bg-white disabled:opacity-30 hover:bg-gray-50 transition-all"
          >
            &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};