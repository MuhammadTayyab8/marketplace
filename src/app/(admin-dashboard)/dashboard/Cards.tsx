import React from 'react';

type CardDataItem = {
  name: string;
  value: any;
  icon: JSX.Element;
  bgColor: string;
  textColor: string;
};

type CardsProps = {
  isLoading: boolean;
  cardData: CardDataItem[];
};

const Cards = ({ isLoading, cardData }: CardsProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index}>
              <div className="relative p-4 shadow-sm border border-gray-100 rounded-xl min-h-32 bg-gray-300 animate-pulse" />
            </div>
          ))
        ) : (
          cardData.map((item, index) => (
            <div key={index} className={`relative p-4 rounded-xl shadow min-h-32 ${item.bgColor}`}>
              <div
                className={`absolute top-2 right-2 ${item.bgColor} ${item.textColor} rounded-full p-2 text-xl flex items-center justify-center`}
              >
                {item.icon}
              </div>
              <div className="text-md text-gray-600">{item.name}</div>
              <div className="text-xl font-semibold text-black">{item.value}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Cards;
