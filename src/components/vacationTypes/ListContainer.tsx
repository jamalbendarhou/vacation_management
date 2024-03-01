"use client";
import BodyWrapper from '@components/BodyWrapper';
import Toolbar from '@components/Toolbar';

export default function ListContainer() {
    return (    

        <BodyWrapper>
            <Toolbar
                title="Type de vacances"
                buttonTitle="ajouter types de vacances"
                onClick={() => console.log('clicked')}
            />
            
        </BodyWrapper>
      );
}