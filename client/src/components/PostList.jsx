import React from 'react';

const PostList = ({ posts }) => {
    return (
        <div className="post-list mt-6">
            <h3 className="text-xl font-semibold mb-2">User Posts</h3>
            <div className="grid grid-cols-3 gap-4">
                {posts.map((post, index) => (
                    <div key={index} className="border border-gray-300 rounded-md p-4 relative">
                        <div className="h-40 bg-gray-200 mb-2 rounded-md"></div>
                        <div className="h-6 bg-gray-200 rounded"></div>
                        <div className="absolute inset-0 border-2 border-blue-400 rounded-md pointer-events-none"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostList;
