
import React from 'react';
import * as Unicons from '@iconscout/react-unicons';

export default function Heading({heading,previous,current}) {

    return (
        <div className='text-xl font-bold w-full flex justify-between items-center text-slate-950 bg-white my-1 py-3 px-3'>
           {heading}
            <a href="/adminportal/" className='text-lg font-light text-sltae-950 flex justify-start  items-center'>
                {previous}
                <Unicons.UilAngleUp width={30} height={30} className="text-sltate-9500 ranslate rotate-90" />
                {current}
            </a>
        </div>

    )
}
