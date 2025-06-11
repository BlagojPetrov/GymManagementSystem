import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const Modal = ({handleClose, content, header}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
        <div onClick={() => handleClose()} className="absolute top-2 right-2 cursor-pointer text-slate-700 hover:text-slate-900">
          <CloseIcon />
        </div>
        <div className="text-xl font-bold mb-4 text-center">
            {header}
        </div>
        <div className="mb-4 text-center">
            {content}
        </div>
      </div>
    </div>
  );
};

export default Modal;
