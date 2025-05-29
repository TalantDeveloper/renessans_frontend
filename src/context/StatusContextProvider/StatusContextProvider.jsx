import React, { createContext, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import ToastComponent from '../../shared/components/toast/GenericToast';

import 'react-toastify/dist/ReactToastify.css';

const DEFAULT_DURATION_MILLIS = 5000;

export const StatusContext = createContext();
export const useStatusContext = () => useContext(StatusContext);

const StatusContextProvider = ({ children }) => {
  const { t } = useTranslation();

  const onSuccessStatus = ({ title, message }) =>
    toast.success(<ToastComponent title={t(title)} description={t(message)} />);

  const onInfoStatus = ({ title, message }) =>
    toast.info(<ToastComponent title={t(title)} description={t(message)} />);

  const onWarningStatus = ({ title, message }) =>
    toast.warning(<ToastComponent title={t(title)} description={t(message)} />);

  const onErrorStatus = ({ title, message }) =>
    toast.error(<ToastComponent title={t(title)} description={t(message)} />);

  const handleThrowValidationErrorMessage = (errorMessage) =>
    onErrorStatus({
      title: 'Validation error',
      message: errorMessage,
    });

  return (
    <StatusContext.Provider
      value={{
        onSuccessStatus,
        onInfoStatus,
        onWarningStatus,
        onErrorStatus,
        handleThrowValidationErrorMessage,
      }}
    >
      <ToastContainer
        position={toast.POSITION.TOP_CENTER}
        autoClose={DEFAULT_DURATION_MILLIS}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        hideProgressBar
      />
      {children}
    </StatusContext.Provider>
  );
};

export default StatusContextProvider;
