import React, { useState } from 'react';
import classes from './CourseLayout.module.css';

import Lab from './images/icon.svg';
import Book from './images/fi-rr-book.svg';
import Doot from './images/Ellipse 77 (1).png';

const CourseLayout = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showLayer, setShowLayer] = useState(false);

  const initialCourseData = {
    courseName: 'Android Dasturlash',
    lessonCount: '10 ta dars',
    duration: '4 soat 32 daqiqa',
    instructor: 'Fozilxon Buzrukxo`jayev',
  };

  const coursesInRow = 3;
  const totalRows = 2;

  const initialCourses = [];
  for (let row = 0; row < totalRows; row++) {
    const rowCourses = [];
    for (let i = 0; i < coursesInRow; i++) {
      rowCourses.push(initialCourseData);
    }
    initialCourses.push(rowCourses);
  }

  const [courses, setCourses] = useState(initialCourses);

  const [editMode, setEditMode] = useState({
    row: -1,
    index: -1,
  });

  const [editData, setEditData] = useState({
    courseName: '',
    lessonCount: '',
    duration: '',
  });

  const [newCourseData, setNewCourseData] = useState({
    courseName: '',
    lessonCount: '',
    duration: '',
  });

  const openAddCourseModal = () => {
    setShowAddCourseModal(true);
    setShowLayer(true);
  };

  const closeAddCourseModal = () => {
    setShowAddCourseModal(false);
    setNewCourseData({
      courseName: '',
      lessonCount: '',
      duration: '',
    });
    setShowLayer(false);
  };

  const handleDelete = (rowIndex, index) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      const updatedCourses = [...courses];
      updatedCourses[rowIndex].splice(index, 1);
      setCourses(updatedCourses);
    }
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
  };

  const handleEdit = (rowIndex, index) => {
    setEditData(courses[rowIndex][index]);
    setEditMode({ row: rowIndex, index });
  };

  const handleSaveChanges = (rowIndex, index) => {
    setCourses((prevCourses) => {
      const updatedCourses = [...prevCourses];
      updatedCourses[rowIndex][index] = editData;
      return updatedCourses;
    });
    setEditMode({ row: -1, index: -1 });
  };

  const updateCourseData = (key, value) => {
    setEditData((prevEditData) => ({
      ...prevEditData,
      [key]: value,
    }));
  };

  const handleNewCourseDataChange = (key, value) => {
    setNewCourseData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleAddCourse = () => {
    const newCourse = {
      courseName: newCourseData.courseName,
      lessonCount: newCourseData.lessonCount,
      duration: newCourseData.duration,
      instructor: 'Feruzbek Safarov',
    };

    setCourses((prevCourses) => {
      const updatedCourses = [...prevCourses];
      let added = false;

      for (let row = 0; row < totalRows; row++) {
        if (updatedCourses[row].length < coursesInRow) {
          updatedCourses[row].push(newCourse);
          added = true;
          break;
        }
      }

      if (!added) {
        updatedCourses.push([newCourse]);
      }

      return updatedCourses;
    });

    closeAddCourseModal();
  };

  return (
    <div>
      <div className={classes['layer']}></div>
      <h1 className={classes['courseH1']}>Mening kurslarim</h1>
      <div className={classes['additionals']}>
        <button onClick={openAddCourseModal}>+</button>
        <input placeholder='Search here...' type='text' />
      </div>
      {courses.map((rowCourses, rowIndex) => (
        <div key={rowIndex} className={classes['courseDashboard']}>
          {rowCourses.map((course, index) => (
            <div key={index} className={classes['dashboardCard']}>
              <div className={classes['coding']}>
                <img src={Lab} alt='' />
                {editMode.row === rowIndex && editMode.index === index ? (
                  <input
                    type='text'
                    value={editData.courseName}
                    onChange={(e) =>
                      updateCourseData('courseName', e.target.value)
                    }
                  />
                ) : (
                  <p>{course.courseName}</p>
                )}
              </div>
              <div className={classes['lessons']}>
                <div className={classes['lesson']}>
                  <img src={Book} alt='' />
                  {editMode.row === rowIndex && editMode.index === index ? (
                    <input
                      type='text'
                      value={editData.lessonCount}
                      onChange={(e) =>
                        updateCourseData('lessonCount', e.target.value)
                      }
                    />
                  ) : (
                    <p>{course.lessonCount}</p>
                  )}
                </div>
                <div className={classes['lesson']}>
                  <img src={Book} alt='' />
                  {editMode.row === rowIndex && editMode.index === index ? (
                    <input
                      type='text'
                      value={editData.duration}
                      onChange={(e) =>
                        updateCourseData('duration', e.target.value)
                      }
                    />
                  ) : (
                    <p>{course.duration}</p>
                  )}
                </div>
              </div>
              <div className={classes['courseUser']}>
                <img src={Doot} alt='' />
                <p>{course.instructor}</p>
              </div>
              <div className={classes['actions']}>
                {editMode.row === rowIndex && editMode.index === index ? (
                  <button onClick={() => handleSaveChanges(rowIndex, index)}>
                    Submit
                  </button>
                ) : (
                  <>
                    <button onClick={() => handleDelete(rowIndex, index)}>
                      Delete
                    </button>
                    <button onClick={() => handleEdit(rowIndex, index)}>
                      Edit
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
      {showAddCourseModal && (
        <div className={classes['modal']}>
          <div className={classes['modalContent']}>
            <h2>Add New Course</h2>
            <input
              type='text'
              placeholder='Course Name'
              value={newCourseData.courseName}
              onChange={(e) =>
                handleNewCourseDataChange('courseName', e.target.value)
              }
            />
            <input
              type='text'
              placeholder='Lesson Count'
              value={newCourseData.lessonCount}
              onChange={(e) =>
                handleNewCourseDataChange('lessonCount', e.target.value)
              }
            />
            <input
              type='text'
              placeholder='Duration'
              value={newCourseData.duration}
              onChange={(e) =>
                handleNewCourseDataChange('duration', e.target.value)
              }
            />
            <div className={classes['forButtons']}>
              <button onClick={handleAddCourse}>Add</button>
              <button onClick={closeAddCourseModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseLayout;
