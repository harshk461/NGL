import React from 'react';

interface MessageBoxProps {
    message: string;
    time: string;
}

const MessageBox: React.FC<MessageBoxProps> = ({ message, time }) => {
    const formattedTime = new Date(time).toLocaleString();
    return (
        <div className='w-full lg:max-w-full lg:w-fit flex flex-col my-2 border-2 border-white rounded-lg px-4 py-2 font-bold'>
            <div className='text-2xl text-blue-400'>{message}</div>
            <div className='text-md text-gray-200'>{formattedTime}</div>
        </div>
    );
};

export default MessageBox;