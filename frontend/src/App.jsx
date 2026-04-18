import { useState } from "react";
import api from "./api";

export default function App() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [equipamentos, setEquipamentos] = useState([]);
  const [locais, setLocais] = useState([]);
  const [logado, setLogado] = useState(!!localStorage.getItem("token"));

  const [nomeLocal, setNomeLocal] = useState("");
  const [tipoLocal, setTipoLocal] = useState("");
  const [enderecoLocal, setEnderecoLocal] = useState("");

  async function login(e) {
    e.preventDefault();

    try {
      const res = await api.post("/users/login", {
        email,
        senha,
      });

      localStorage.setItem("token", res.data.token);
      setLogado(true);
      setMensagem("Login realizado com sucesso!");
    } catch (err) {
      setMensagem("Erro no login");
    }
  }

  async function registrar(e) {
    e.preventDefault();

    try {
      await api.post("/users/register", {
        nome,
        email,
        senha,
      });

      setMensagem("Usuário cadastrado com sucesso!");
      setNome("");
      setEmail("");
      setSenha("");
    } catch (err) {
      setMensagem("Erro ao cadastrar usuário");
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setLogado(false);
    setEquipamentos([]);
    setLocais([]);
    setMensagem("Logout realizado com sucesso!");
  }

  async function listarEquipamentos() {
    try {
      const res = await api.get("/equipamentos");
      setEquipamentos(res.data);
      setMensagem("Equipamentos carregados com sucesso!");
    } catch (err) {
      setMensagem("Erro ao buscar equipamentos");
    }
  }

  async function listarLocais() {
    try {
      const res = await api.get("/locais");
      setLocais(res.data);
      setMensagem("Locais carregados com sucesso!");
    } catch (err) {
      setMensagem("Erro ao buscar locais");
    }
  }

  async function cadastrarLocal(e) {
    e.preventDefault();

    try {
      await api.post("/locais", {
        nome: nomeLocal,
        tipo: tipoLocal,
        endereco: enderecoLocal,
      });

      setMensagem("Local cadastrado com sucesso!");
      setNomeLocal("");
      setTipoLocal("");
      setEnderecoLocal("");

      listarLocais();
    } catch (err) {
      setMensagem("Erro ao cadastrar local");
    }
  }

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>API - Gestão de Equipamentos</h1>

      {!logado ? (
        <>
          <h2>Login</h2>
          <form onSubmit={login}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br /><br />

            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <br /><br />

            <button type="submit">Login</button>
          </form>

          <hr style={{ margin: "20px 0" }} />

          <h2>Registro</h2>
          <form onSubmit={registrar}>
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <br /><br />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br /><br />

            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <br /><br />

            <button type="submit">Cadastrar</button>
          </form>
        </>
      ) : (
        <>
          <h2>Painel</h2>

          <button onClick={listarEquipamentos}>Listar Equipamentos</button>
          <button onClick={listarLocais} style={{ marginLeft: 10 }}>
            Listar Locais
          </button>
          <button onClick={logout} style={{ marginLeft: 10 }}>
            Logout
          </button>

          <hr style={{ margin: "20px 0" }} />

          <h2>Cadastrar Local</h2>
          <form onSubmit={cadastrarLocal}>
            <input
              type="text"
              placeholder="Nome do local"
              value={nomeLocal}
              onChange={(e) => setNomeLocal(e.target.value)}
            />
            <br /><br />

            <input
              type="text"
              placeholder="Tipo"
              value={tipoLocal}
              onChange={(e) => setTipoLocal(e.target.value)}
            />
            <br /><br />

            <input
              type="text"
              placeholder="Endereço"
              value={enderecoLocal}
              onChange={(e) => setEnderecoLocal(e.target.value)}
            />
            <br /><br />

            <button type="submit">Cadastrar Local</button>
          </form>

          <hr style={{ margin: "20px 0" }} />

          <h2>Equipamentos</h2>
          <ul>
            {equipamentos.map((eq) => (
              <li key={eq._id}>
                {eq.nome} - {eq.status}
              </li>
            ))}
          </ul>

          <h2>Locais</h2>
          <ul>
            {locais.map((local) => (
              <li key={local._id}>
                {local.nome} - {local.tipo} - {local.endereco}
              </li>
            ))}
          </ul>
        </>
      )}

      <p style={{ marginTop: 20 }}>{mensagem}</p>
    </div>
  );
}