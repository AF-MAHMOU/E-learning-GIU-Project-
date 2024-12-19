export default function Home() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full h-screen p-4 bg-white shadow-lg rounded-none">

                {/* Chat Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-blue-500">
                    <h2 className="text-lg font-semibold text-white">E-learning Chat</h2>
                    <button className="text-sm text-white hover:underline">Leave</button>
                </div>

                {/* Chat Messages */}
                <div className="h-[80%] overflow-y-auto border border-gray-300 rounded-md p-3 bg-gray-50 space-y-3">
                    {/* Example Chat Messages */}
                    <div className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500"></div>
                        <div className="ml-3">
                            <div className="bg-white p-2 rounded-lg shadow-sm">
                                <p className="text-sm text-gray-700">Hey! How are you doing?</p>
                            </div>
                            <span className="text-xs text-gray-500">10:30 AM</span>
                        </div>
                    </div>

                    <div className="flex items-end justify-end">
                        <div className="mr-3">
                            <div className="bg-blue-500 text-white p-2 rounded-lg shadow-sm">
                                <p className="text-sm">Im doing well, thanks for asking! 😊</p>
                            </div>
                            <span className="text-xs text-gray-500">10:31 AM</span>
                        </div>
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300"></div>
                    </div>

                    <div className="text-gray-500 italic text-center mt-2">We are here to learn :)</div>
                </div>

                {/* Chat Input */}
                <div className="mt-4">
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        />
                        <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500">
                            Send
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

