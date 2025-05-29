// import _ from "lodash";

const INITIAL_STATE = {
  menu: [],
  menu_loading: false,
  loading: false,
  loading_text: "",
  user: {},
  audio_diktor: false,
  footer: {},
  authModal: false,
  sosModal: false,
};

const reducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_MENU":
      return {
        ...state,
        menu: action?.payload,
        menu_loading: false,
      };
    case "SET_MENU_LOADING":
      return {
        ...state,
        menu_loading: action?.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action?.payload,
        loading_text: action?.loading_text ?? "",
      };
    case "SET_USER":
      return {
        ...state,
        user: action?.payload,
      };
    case "SET_AUDIO_DIKTOR":
      return {
        ...state,
        audio_diktor: action?.payload,
      };
    case "SET_FOOTER":
      return {
        ...state,
        footer: action?.payload,
      };
    case "SET_AUTH_MODAL":
      return {
        ...state,
        authModal: action?.payload,
      };
    case "SET_SOS_MODAL":
      return {
        ...state,
        sosModal: action?.payload,
      };
    default:
      return state;
  }
};
export default reducers;
