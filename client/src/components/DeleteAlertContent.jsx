import React from 'react'

const DeleteAlertContent = ({content,onDelete}) => {
  return (
    <div className='p-5'>
        <p className="text-[14px]">{content}</p>
        <div className="flex justify-end mt-6">
            <button onClick={onDelete} className="bg-amber-500 cursor-pointer px-5 py-2 rounded-lg text-sm text-white font-semibold" type="submit">Delete</button>
        </div>
    </div>
  )
}

export default DeleteAlertContent;