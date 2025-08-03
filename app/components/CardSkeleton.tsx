// src/components/CardSkeleton.tsx
import React from 'react';

interface CardSkeletonProps {
  count?: number;
}

const CardSkeleton: React.FC<CardSkeletonProps> = ({ count = 1 }) => {
  const skeletons = Array.from({ length: count }).map((_, index) => (
    <div key={index} className='card-skeleton h-[350px]'>
        <div className="w-full h-[50%] bg-skeleton relative">
            <div className='skeleton-wave'></div>
        </div>
        <div className="mx-3">
            <div className='w-[80%] h-5 bg-skeleton rounded-sm relative overflow-hidden mt-5'><p className='skeleton-wave'></p></div>
            <div>
                <div className='w-[50%] h-4 bg-skeleton relative overflow-hidden mt-5'><p className='skeleton-wave'></p></div>
                <div className='w-[50%] h-4 bg-skeleton relative overflow-hidden mt-2'><p className='skeleton-wave'></p></div>
                <div className='w-[50%] h-4 bg-skeleton relative overflow-hidden mt-2'><p className='skeleton-wave'></p></div>
            </div>
        </div>
    </div>
  ));

  return <>{skeletons}</>;
};

export default CardSkeleton;