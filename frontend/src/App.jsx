import { useState } from "react";
import api from "./api";

export default function App() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [equipamentos, setEquipamentos] = useState([]);

  // LOGIN
  async function login(e) {
    e.preventDefault();

    try {
      const res = await api.post("/users/login", {
        email,
        senha,
      });

      localStorage.setItem("token", res.data.token);
      setMensagem("Login realizado com sucesso!");
    } catch (err) {
      setMensagem("Erro no login");
    }
  }

  // LISTAR EQUIPAMENTOS
  async function listarEquipamentos() {
    try {
      const res = await api.get("/equipamentos");
      setEquipamentos(res.data);
    } catch (err) {
      setMensagem("Erro ao buscar equipamentos");
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>API - Gestão de Equipamentos</h1>

      <h2>Login</h2>
      <form onSubmit={login}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>

      <br />

      <button onClick={listarEquipamentos}>
        Listar Equipamentos
      </button>

      <p>{mensagem}</p>

      <ul>
        {equipamentos.map((eq) => (
          <li key={eq._id}>
            {eq.nome} - {eq.status}
          </li>
        ))}
      </ul>
    </div>
  );
}