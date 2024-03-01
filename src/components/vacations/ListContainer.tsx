"use client";
import BodyWrapper from '@components/BodyWrapper';
import Toolbar from '@components/Toolbar';

export default function ListContainer() {
    return (    

        <BodyWrapper>
            <Toolbar
                title="Vacances"
                buttonTitle="Ajouter Vacance"
                onClick={() => console.log('clicked')}
            />
            
        </BodyWrapper>
      );
}