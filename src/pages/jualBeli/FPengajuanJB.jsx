import Header from "../../comp/global/header/Header";
import Sidebar from "../../comp/global/Sidebar";

export default function FPengajuanJB(){
   const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
 return (
    <div id="main-wrapper">
      <Header onUserChange={handleUserChange} />
      <Sidebar user={user} />

      <div className="page-wrapper">
      </div>
      </div>
      )
}