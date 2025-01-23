import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';

const AnimatedSearchBar = ({ onSearch }: {
    onSearch: (query: string) => void;
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            onSearch(searchQuery);
        }
    };

    const handleClear = () => {
        setSearchQuery('');
        setIsExpanded(false);
    };

    return (
        <div className="relative w-full max-w-xl mx-auto mt-8">
            <form onSubmit={handleSubmit} className="relative">
                <div
                    className={`flex items-center bg-white rounded-full border border-gray-200 shadow-sm transition-all duration-300 ease-in-out ${isExpanded ? 'w-full' : 'w-12 md:w-48'
                        }`}
                >
                    <button
                        type="button"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="p-3 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <FaSearch className="w-5 h-5 text-gray-500" />
                    </button>

                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search articles..."
                        className={`w-full py-2 pr-4 bg-transparent outline-none text-gray-700 placeholder-gray-400 ${isExpanded ? 'opacity-100' : 'opacity-0 md:opacity-100'
                            }`}
                    />

                    {searchQuery && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="p-3 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <FaX className="w-4 h-4 text-gray-500" />
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default AnimatedSearchBar;