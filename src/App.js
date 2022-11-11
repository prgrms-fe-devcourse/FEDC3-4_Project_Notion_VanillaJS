export default function App({$target, initialState}) {
  this.state = initialState;
  
  this.route = () => {
    const {pathname} = window.location;
    const [, documentId] = pathname.split('/');
    
    if (documentId.length > 0) editor.setState(documentId);
  }
  
  this.init = () => {
    this.route(); 
  }
}