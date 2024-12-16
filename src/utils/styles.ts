export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Active':
      return 'bg-green-50 text-green-700 border border-green-100';
    case 'Expired':
      return 'bg-red-50 text-red-700 border border-red-100';
    case 'Pending Renewal':
      return 'bg-amber-50 text-amber-700 border border-amber-100';
    default:
      return 'bg-gray-50 text-gray-700 border border-gray-100';
  }
};

export const getClaimStatusColor = (status: string): string => {
  switch (status) {
    case 'Approved':
      return 'bg-green-50 text-green-700 border border-green-100';
    case 'Denied':
      return 'bg-red-50 text-red-700 border border-red-100';
    case 'In Review':
      return 'bg-amber-50 text-amber-700 border border-amber-100';
    case 'Draft':
      return 'bg-gray-50 text-gray-700 border border-gray-100';
    default:
      return 'bg-blue-50 text-blue-700 border border-blue-100';
  }
};
