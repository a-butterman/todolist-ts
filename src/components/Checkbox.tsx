import React, {ChangeEvent} from 'react';

type CheckboxPropsType = {
    callBack: (isDone: boolean) => void
    isDone: boolean
}

export const Checkbox = (props: CheckboxPropsType) => {

    const changeIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callBack(e.currentTarget.checked)
    };


    return (
            <input type="checkbox"
                   checked={ props.isDone }
                   onChange={ changeIsDoneHandler }/>
    );
};