import React, { useState } from 'react'
import classes from './LiberyModal.module.css'

import { Icon } from '@iconify/react';
import { CARD_OBJ } from '../LibraryCard/card';

export const LiberyModal = ({ save, isOpen, setIsOpen }) => {
    const [inputText, setInputText] = useState({
        grade: '',
        subject: '',
        bookCover: '',
        bookType: '',
        language: '',
        date: '',
    })

    // inputChanger
    const handleTextChanger = (e) => {
        setInputText({
            ...inputText,
            [e.target.name]: e.target.value
        })
    }

    const getAdd = (e) => {
        const newData = {
            id: CARD_OBJ.length + 1,
            grade: inputText?.grade,
            subject: inputText?.subject,
            date: inputText?.date,
            bookCover: inputText?.bookCover,
            bookType: inputText?.bookType,
            language: inputText?.language,
        };

        if (inputText.length !== 0) {
            save(newData);
            setIsOpen(false);
        }
    };


    return (
        <div style={isOpen ? { transform: 'scale(1)' } : { transform: 'scale(0)' }}
            className={classes['wrapper']}>
            <div style={isOpen ? { transform: 'scale(1)' } : { transform: 'scale(0)' }}
                className={classes['container']}>
                <Icon
                    onClick={() => setIsOpen(false)}
                    className={classes['icon']}
                    icon='ph:x-bold'
                />
                <h1 className={classes['title']}>Add Card</h1>
                <label className={classes['text']}>Wich grade?</label>
                <input
                    onChange={(e) => handleTextChanger(e)}
                    className={classes['input']}
                    type='text'
                    required
                    name='grade'
                    minLength={5}
                />
                <label className={classes['text']}>Wich Subject?</label>
                <input
                    onChange={(e) => handleTextChanger(e)}
                    className={classes['input']}
                    type='text'
                    required
                    name='subject'
                    minLength={5}
                />
                <label className={classes['text']}>Date</label>
                <input
                    onChange={(e) => handleTextChanger(e)}
                    className={classes['input']}
                    type='date'
                    required
                    name='date'
                />
                <label className={classes['text']}>Book Cover</label>
                <input
                    onChange={(e) => handleTextChanger(e)}
                    className={classes['input']}
                    type='text'
                    name='bookCover'
                    required
                    minLength={10}
                />
                <label className={classes['text']}>Book Type</label>
                <input
                    onChange={(e) => handleTextChanger(e)}
                    className={classes['input']}
                    type='text'
                    required
                    name='bookType'
                    minLength={10}
                />
                <label className={classes['text']}>Wich Language?</label>
                <input
                    onChange={(e) => handleTextChanger(e)}
                    className={classes['input']}
                    type='text'
                    name='language'
                    required
                    minLength={10}
                />
                <button onClick={getAdd} className={classes['btn']}>
                    Save
                </button>
            </div>
        </div>
    )
}
