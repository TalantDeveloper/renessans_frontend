import classes from './ExamResultsTable.module.css';

export const ExamResultsTable = ({ userData }) => {
  return (
    <div className={classes['table-wrapper']}>
      <table className={classes['table-container']}>
        <thead>
          <tr>
            <td className={classes['table-headers']}>Id</td>
            <td className={classes['table-headers']}>Ism</td>
            <td className={classes['table-headers']}>Familiya</td>
            <td className={classes['table-headers']}>Sinf</td>
            <td className={classes['table-headers']}>Algebra</td>
            <td className={classes['table-headers']}>Geometriya</td>
            <td className={classes['table-headers']}>Kimyo</td>
            <td className={classes['table-headers']}>Adabiyot</td>
          </tr>
        </thead>
        <tbody>
          {userData.map((value, index) => {
            return (
              <tr
                style={index % 2 === 0 ? { background: '#f8f8f8' } : {}}
                className={classes['table-body-tr']}
              >
                <td className={classes['table-items']}>{index + 1}</td>
                <td className={classes['table-items']}>
                  {value?.name.toUpperCase()}
                </td>
                <td className={classes['table-items']}>
                  {value?.surename.toUpperCase()}
                </td>
                <td className={classes['table-items']}>{value?.class}</td>
                <td className={classes['table-items']}>
                  <div
                    className={`${classes['table-status']} ${
                      classes[
                        value?.algebra > 25 ? 'status-good' : 'status-bad'
                      ]
                    } `}
                  >
                    {value?.algebra.toString().slice(0, 4)}
                  </div>
                </td>
                <td className={classes['table-items']}>
                  <div
                    className={`${classes['table-status']} ${
                      classes[
                        value?.geometriya > 25 ? 'status-good' : 'status-bad'
                      ]
                    }`}
                  >
                    {value?.geometriya.toString().slice(0, 4)}
                  </div>
                </td>
                <td className={classes['table-items']}>
                  <div
                    className={`${classes['table-status']} ${
                      classes[
                        value?.chemistry > 25 ? 'status-good' : 'status-bad'
                      ]
                    }`}
                  >
                    {value?.chemistry.toString().slice(0, 4)}
                  </div>
                </td>
                <td className={classes['table-items']}>
                  <div
                    className={`${classes['table-status']} ${
                      classes[
                        value?.literature > 25 ? 'status-good' : 'status-bad'
                      ]
                    }`}
                  >
                    {value?.literature.toString().slice(0, 4)}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExamResultsTable;
