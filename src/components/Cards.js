import React, {useEffect,useState} from "react";
import {useParams} from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import $ from 'jquery'; 


export default function Cards() {
  var est = localStorage.getItem('est');
  const [seconds, setSeconds] = React.useState(60);
  const [estado, setEstado] = useState('bien');
  const [rialtime, setRialtime] = useState(0);
  


  



  
    const [resp2,setResp2] = useState([]);
    const [resp,setResp] = useState([]);
    const { cod } = useParams();
    const [c,setC] = useState([]);
    useEffect(() => {
      getAcertijos();
    }, []);

    function shuffle(array) {
      let currentIndex = array.length,  randomIndex;
    
      // While there remain elements to shuffle.
      while (currentIndex > 0) {
    
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }
    
      return array;
    }

    function getAcertijos() {
      setEstado(est);//http://localhost:80/ https://pfjas.codecland.com/
    axios.get("https://pfjas.codecland.com/pfjas/api/acertijos/ver?cod=ver1&co="+cod ).then(function (response) {
        console.log(response.data);
        setC(response.data);
        //history.push('/');
        //
        setResp(shuffle([
          [response.data[0].r_correcta,'correcta'],
          [response.data[0].r_inc1,'incorrecta'],
          [response.data[0].r_inc2,'incorrecta'], 
          [response.data[0].r_inc3,'incorrecta']
          
        ])); 
         
        /*response.data.map((el) => (
          console.log(el.id)
        ));*/

        
        

      });
  }


  const showSwal = () => {
    withReactContent(Swal).fire({
      
      title: "¡Correcto!",
      html: "<div>La Próxima Pista está en: <br />✨<strong>"+c[0].pista+"</strong>✨</div>",
      icon: "success",
      background: '#1D232A',
      color:'var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))'
      
    })
  } 

  const erro = () => {
    withReactContent(Swal).fire({
      
      title: "¡Incorrecto!",
      text: "Intentalo de nuevo en unos Minutos 😖",
      icon: "error",
      background: '#1D232A',
      color:'var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))'
      
    })
  }


  function Bien(){
    

    var checkedValue = document.querySelector('.correcta').checked;
    switch(checkedValue){
      case true: showSwal();
           break;
      case false: erro();
                  $('input:radio').removeAttr('checked');
                  $('input:radio').attr('disabled','true');
                  setEstado('mal');
                  localStorage.setItem('est', 'mal');
                  setTimeout(() => {

                    console.log("Intentalo De nuevo");
                    $("input:radio").removeAttr("disabled");
                    setEstado('bien');
                    localStorage.setItem('est', 'bien');

                  }, 60000);
           break;     

    }
  }

  function fancyTimeFormat(duration) {
    // Hours, minutes and seconds
    const hrs = ~~(duration / 3600);
    const mins = ~~((duration % 3600) / 60);
    const secs = ~~duration % 60;
  
    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = "";
  
    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
  
    ret += "0" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
  
    return ret;
  }

React.useEffect(() => {
  

  if (estado=='mal') {
    $('input:radio').removeAttr('checked');
    $('input:radio').attr('disabled','true');
    $('#tiempo').removeClass('nono');
    $('#tiempo').addClass('sisi');
  }else if(estado=='bien'){
    $("input:radio").removeAttr("disabled");
    setSeconds(60);
    $('#tiempo').removeClass('sisi');
    $('#tiempo').addClass('nono');
  }

  if (seconds > 0 && estado=='mal') {
    setTimeout(() => setSeconds(seconds - 1), 1000);
    setRialtime(fancyTimeFormat(seconds));
  }else if(seconds==0){
    setEstado('bien');
    localStorage.setItem('est', 'bien');
    $('#tiempo').removeClass('sisi');
    $('#tiempo').addClass('nono');
  }
});
















  



  return (
    <div className="card cent ">
      <div className="card w-96 pad bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://pfjas.codecland.com/PFJAS-logo.png"
            alt="Shoes"
          />
        </figure>
        {
          c.map((a, key) =>
          
          <div className="mibg">
            
            

          <div className="card-body pad-b">
            <span id="tiempo" className="countdown font-mono nono text-6xl">
             {rialtime}
            </span>
            
        
          <h2 className="card-title">
            Acertijo <strong>{a.codigo}</strong>
          </h2>
          <p>{a.acerti}</p>
        </div>
        <div className="divider divide-gray-50"></div>
        <div className="card-body pad-lb">
        <div className="col-2">
          <div className="form-control marg-b">
            <label className="lado cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                className={resp[0][1]+" radio marg-r checked:bg-blue-500"}
                
                
              />
              <span className="label-text">{resp[0][0]}</span>
            </label>
          </div>
          <div className="form-control marg-b">
            <label className="lado cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                className={resp[1][1]+" radio marg-r checked:bg-blue-500"}
                
              />
              <span className=" label-text">{resp[1][0]}</span>
            </label>
          </div>
        </div>  
        <div className="col-2">  
          <div className="form-control marg-b">
            <label className="lado cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                className={resp[2][1]+" radio marg-r checked:bg-blue-500"}
                
              />
              <span className=" label-text">{resp[2][0]}</span>
            </label>
          </div>
          <div className="form-control marg-b">
            <label className="lado cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                className={resp[3][1]+" radio marg-r checked:bg-blue-500"}
                
              />
              <span className="label-text">{resp[3][0]}</span>
            </label>
          </div>
        </div>    
          

          <div className="card-actions justify-center">
            <button onClick={Bien} className="btn btn-primary">Enviar</button>
          </div>
        </div>



        </div>
        
          )
        }
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        
        
      </div>
      
    </div>
  );
}
