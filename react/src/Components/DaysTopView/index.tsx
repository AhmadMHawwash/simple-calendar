import * as React from 'react';

interface DaysTopViewProps {
    daysNames: string[];
    sideLength: number;
}

const DaysTopView: React.SFC<DaysTopViewProps> = ({daysNames, sideLength}) => {
    return <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: 10, marginTop: 10 }}>
        {
            daysNames.map((dayName, index) =>
                (
                    <div key={index} style={{ width: sideLength, fontFamily: 'bold', textAlign: 'center' }}>
                        {dayName}
                    </div>
                )
            )
        }
    </div>
};

export default DaysTopView;