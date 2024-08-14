import React from 'react';
import { useSelector } from 'react-redux';

interface ShowBooksProps {
  handleItemClick: (id: string) => void;
}

export default function ShowBooks({ handleItemClick }: ShowBooksProps) {
  const books = useSelector((state: any) => state.searchResults.books);

  if (books && books.length > 0) {
    return (
      <div>
        <div className="container mx-auto mb-20">
          {books.map((book:any, index:any) => (
            <div
              key={book.id}
              id={book.id}
              className={`flex items-start my-4 p-4 border-gray-200/50 text-left shadow-lg px-10 py-20 hover:shadow-blue-500/40 transition-shadow duration-500 ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
              }`}
              onClick={() => handleItemClick(book.id)}
            >
              {book.volumeInfo.imageLinks && (
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt="thumbnail"
                  className="w-50 h-50 mr-4"
                />
              )}
              <div className="flex flex-col">
                {book.volumeInfo.title && (
                  <p className="font-bold text-xl">{book.volumeInfo.title}</p>
                )}

                <div className="text-sm text-gray-600">
                  {book.volumeInfo.authors && (
                    <>
                      <span>
                        <strong>Authors: </strong>
                      </span>
                      {book.volumeInfo.authors.map((author:any, index:any) => (
                        <span key={index}>
                          {author}
                          {index < book.volumeInfo.authors.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </>
                  )}
                </div>
                {book.volumeInfo.publisher && (
                  <span className="text-sm text-gray-600">
                    <strong>Publisher: </strong>
                    {book.volumeInfo.publisher}
                  </span>
                )}
                {book.volumeInfo.publishedDate && (
                  <span className="text-sm text-gray-600">
                    <strong>Published Date: </strong>
                    {book.volumeInfo.publishedDate}
                  </span>
                )}
                {book.volumeInfo.description && (
                  <span className="text-sm">
                    <strong>Description: </strong>
                    {book.volumeInfo.description}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="mt-60">
        <h2>No Results to show!</h2>
      </div>
    );
  }
}
