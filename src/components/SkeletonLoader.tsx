import React from 'react';

export default function SkeletonLoader() {
  return (
    <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-6 space-y-8 animate-pulse text-text-main">
       <div className="w-16 h-16 rounded-full bg-border-subtle" />
       <div className="w-64 h-8 rounded-full bg-border-subtle" />
       
       <div className="w-full max-w-4xl grid md:grid-cols-3 gap-6 mt-12">
         {[1, 2, 3].map(i => (
           <div key={i} className="h-64 rounded-3xl bg-bg-secondary border border-border-subtle flex flex-col p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-border-subtle" />
              <div className="w-3/4 h-6 rounded-full bg-border-subtle mt-auto" />
              <div className="w-full h-4 rounded-full bg-border-subtle" />
              <div className="w-5/6 h-4 rounded-full bg-border-subtle" />
           </div>
         ))}
       </div>
    </div>
  );
}
