import { ButtonDefault } from "../Buttons/Default";
import { ButtonAction } from "../Buttons/Actions";
import { FaPlus } from "react-icons/fa";
import axios from "axios";

const API = process.env.REACT_APP_ENDPOINT;

export function ModalDefault(props) {
  const handlerSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newHero = {
      name: formData.get("name"),
      imagem: formData.get("imagem"),
    };
    try {
      const { data } = await axios.post(`${API}/heroes`, newHero);
      props.onSuccess(data);
      props.onClose();
    } catch (error) {
      alert(`Erro ao adicionar herói: ${error}`);
      console.error(error);
    }
  };

  return (
    <div
      id="authentication-modal"
      tabIndex="-1"
      aria-hidden="false"
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative  rounded-lg shadow-sm bg-gray-800">
          <div className="p-4">
            <form className="space-y-4" onSubmit={handlerSubmit}>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">
                  {props.title}
                </h3>
                <ButtonAction
                  variant="close"
                  onClick={props.onClose}
                ></ButtonAction>
              </div>
              <div className="p-2 border-b rounded-t border-gray-600"></div>
              <div>
                <label className="block text-left mb-1 text-sm font-medium text-white">
                  Nome Herói:
                </label>
                <input
                  name="name"
                  className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                  placeholder="Digite o nome do herói"
                  required
                />
              </div>
              <div>
                <label className="block text-left mb-1 text-sm font-medium text-white">
                  Url Avatar:
                </label>
                <input
                  name="imagem"
                  placeholder="https://urldoavatar.com"
                  className="text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                  required
                />
              </div>
              <div className="flex items-center justify-between p-2 border-b rounded-t border-gray-600"></div>
              <div className="flex justify-center">
                <ButtonDefault
                  type="submit"
                  variant="primary"
                  icon={<FaPlus size={15} />}
                >
                  Adicionar Novo Herói
                </ButtonDefault>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
