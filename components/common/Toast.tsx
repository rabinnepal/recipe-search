import { useState, useEffect } from "react";

type ToastProps = {
  message: string;
  type: "success" | "error" | "info" | "warning";
  onClose: () => void;
};

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getToastStyle = (): string => {
    switch (type) {
      case "success":
        return "bg-green-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      case "info":
        return "bg-blue-500 text-white";
      case "warning":
        return "bg-yellow-500 text-black";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div
      className={`toast fixed top-4 right-4 px-4 py-2 rounded shadow-lg ${getToastStyle()}`}
    >
      <p>{message}</p>
    </div>
  );
};

type ToastItem = {
  id: number;
  message: string;
  type: "success" | "error" | "info" | "warning";
};

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (
    message: string,
    type: "success" | "error" | "info" | "warning" = "info"
  ) => {
    const id = Date.now();
    setToasts([...toasts, { id, message, type }]);

    setTimeout(() => {
      setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
    }, 3000);
  };

  return {
    showToast,
    ToastContainer: () => (
      <div className="toast-container fixed top-4 right-4 z-50">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() =>
              setToasts((toasts) => toasts.filter((t) => t.id !== toast.id))
            }
          />
        ))}
      </div>
    ),
  };
};
