interface DeleteConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmation({ onConfirm, onCancel }: DeleteConfirmationProps) {
  return (
    <div className="text-center">
      <h3 className="mb-5 text-lg font-normal text-gray-500">
        Are you sure you want to delete this user?
      </h3>
      <div className="flex justify-center gap-4">
        <button
          type="button"
          onClick={onConfirm}
          className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
        >
          Yes, delete
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}