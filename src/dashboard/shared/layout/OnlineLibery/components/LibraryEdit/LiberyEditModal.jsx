import React, { useState, useEffect } from 'react'
import classes from './LiberyEditModal.module.css'
import { Icon } from '@iconify/react';

export const LiberyEditModal = ({
    isEditOpen,
    setIsEditOpen,
    edit,
    editId,
    setIsLoading,
    data
}) => {

    const [inputText, setInputText] = useState({
        grade: '',
        subject: '',
        bookCover: '',
        bookType: '',
        language: '',
        date: '',
    })

    const [editData, setOneData] = useState({});


    const getAdd = (e) => {
        const newEditData = {
            id: editId,
            grade: inputText?.grade,
            subject: inputText?.subject,
            date: inputText?.date,
            bookCover: inputText?.bookCover,
            bookType: inputText?.bookType,
            language: inputText?.language,
        };
        edit(newEditData);
        setIsEditOpen(false);
        setIsLoading(true);
    };

    useEffect(() => {
        const oneFiltered = data.filter((value) => value.id == editId);
        setOneData(oneFiltered[0]);
    }, [editId]);
    useEffect(() => {
        setInputText({
            grade: editData?.grade,
            subject: editData?.subject,
            bookCover: editData?.bookCover,
            bookType: editData?.bookType,
            language: editData?.language,
            date: editData?.data,
        })
    }, [editData]);

    const handleTextChanger = (e) => {
        setInputText({
            ...inputText,
            [e.target.name]: e.target.value
        })
    }


    return (
        <div style={isEditOpen ? { transform: 'scale(1)' } : { transform: 'scale(0)' }}
            className={classes['wrapper']}>
            <div style={isEditOpen ? { transform: 'scale(1)' } : { transform: 'scale(0)' }}
                className={classes['container']}>
                <Icon
                    onClick={() => setIsEditOpen(false)}
                    className={classes['icon']}
                    icon='ph:x-bold'
                />
                <h1 className={classes['title']}>Edit Card</h1>
                <label className={classes['text']}>Wich Grade?</label>
                <input
                    onChange={(e) => handleTextChanger(e)}
                    className={classes['input']}
                    type='number'
                    name='grade'
                    required
                    value={inputText?.grade}
                />             
                <label className={classes['text']}>Wich Subject?</label>
                <input
                    onChange={(e) => handleTextChanger(e)}
                    className={classes['input']}
                    type='text'
                    name='subject'
                    required
                    value={inputText?.subject}
                />
                <label className={classes['text']}>Date</label>
                <input
                    onChange={(e) => handleTextChanger(e)}
                    className={classes['input']}
                    type='date'
                    name='date'
                    value={inputText?.date}
                />
                <label className={classes['text']}>Book Cover</label>
                <input
                    onChange={(e) => handleTextChanger(e)}
                    className={classes['input']}
                    type='text'
                    name='bookCover'
                    value={inputText?.bookCover}
                />
                <label className={classes['text']}>Book Type</label>
                <input
                    onChange={(e) => handleTextChanger(e)}
                    className={classes['input']}
                    type='text'
                    name='bookType'
                    value={inputText?.bookType}
                />
                <label className={classes['text']}>Language</label>
                <input
                    onChange={(e) => handleTextChanger(e)}
                    className={classes['input']}
                    type='text'
                    name='language'
                    value={inputText?.language}
                />
                <button onClick={getAdd} className={classes['btn']}>
                    Save
                </button>
            </div>
        </div>
    )
}
