import { ButtonDefault } from "../Buttons/Default";
import { ButtonAction } from "../Buttons/Actions";
import { FaPlus, FaSave } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";

const API = process.env.REACT_APP_ENDPOINT;

export function ModalDefault(props) {
  const [formData, setFormData] = useState({
    name: "",
    imagem: "",
  });

  useEffect(() => {
    if (props.hero) {
      setFormData({ name: props.hero.name, imagem: props.hero.imagem });
    }
  }, [props.hero]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();

    try {
      let result;
      if (props.hero) {
        const { data } = await axios.put(`${API}/heroes`, {
          id: props.hero.id,
          ...formData,
        });
        result = data;
      } else {
        const { data } = await axios.post(`${API}/heroes`, formData);
        result = data;
      }
      props.onSuccess(result);
      props.onClose();
    } catch (error) {
      alert(
        `Erro ao ${props.hero ? "atualizar" : "adicionar"} herói: ${error}`
      );
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
                  value={formData.name}
                  onChange={handleChange}
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
                  value={formData.imagem}
                  onChange={handleChange}
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
                  icon={
                    props.hero ? <FaSave size={15} /> : <FaPlus size={15} />
                  }
                >
                  {props.hero ? "Salvar Alterações" : "Adicionar Novo Herói"}
                </ButtonDefault>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
