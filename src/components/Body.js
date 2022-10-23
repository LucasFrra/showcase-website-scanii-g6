import React from 'react'
import './Body.scss'
import CloudUpload from '@material-ui/icons/CloudUpload';
class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  //Method after the submition of the form
  handleSubmit(e) {
    e.preventDefault()
    var promise = new Promise((resolve, reject) => {
      console.log("step 1")
      const request = new XMLHttpRequest();
      request.open('get', '/auth-token.json', true);
      request.onload = () => {
        console.log(request.status);
        if (request.status === 200) {
          const token = JSON.parse(request.responseText);
          console.log(`${request.responseText}`)
          resolve(token);
        } else {
          reject(request.responseText);
        }
      };
      request.onerror = () => {
        reject(request.responseText);

      };
      request.send();
    })
    promise.then(token => {
      return new Promise((resolve, reject) => {
        console.log("step 2");

        const credentials = btoa(token.id + ':');
        const formData = new FormData();
        formData.append("file", document.getElementById('file').files[0]);

        const request = new XMLHttpRequest();
        request.open('POST', 'https://api.scanii.com/v2.1/files', true);
        request.setRequestHeader('Authorization', 'Basic ' + credentials);

        request.onreadystatechange = () => {
          console.log(request.status);
          if (request.status === 201) {
            var findings = JSON.parse(request.responseText);
            console.log(findings.findings)
            if(findings.findings.length === 0){
              this.setState({ value: 'Any malware detected.'})
            }else{
              this.setState({ value: `Malware detected !  ${findings.findings}`})
            }
            
            
            //resolve(JSON.parse(request.responseText))
          } else {
            //reject(request.responseText);
          }
        };
        request.send(formData)
      }).then(result => {
        console.log("step 3")
        document.getElementById("fileId").setAttribute('value', result.id);
      })
    })


  }


  render() {
    
    return (
      <div>
        <div className='header-form'>
          <img className='header-form__logo' alt='VirusScanner'></img>
          <h5 className='body_title'>Analyse files to detect malwares and other breaches</h5>
        </div>
        <form className='form' method="post" action="/process" onSubmit={this.handleSubmit}>
          <input id="fileId" type="hidden" name="fileId" />

          <div className='form__content'>

            <input className='input-file' type="file" id="file" name="file" required />
            <label htmlFor="file"><div className='icon-text'><CloudUpload className='upload-icon' /><span>Choose a file...</span></div></label>

          </div>

          <div className='form__content'>
            <input className="input-submit" type="submit" value='Submit' />
          </div>

          <div className='form__content'>
            <span>{this.state.value}</span>
          </div>
        </form>

        
      </div>
    );
  }
}

export default Body