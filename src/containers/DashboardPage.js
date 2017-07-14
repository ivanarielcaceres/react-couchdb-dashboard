import React from 'react';
import {cyan600, pink600} from 'material-ui/styles/colors';
import EditorAttachFile from 'material-ui/svg-icons/editor/attach-file';
import ImagePictureAsPdf from 'material-ui/svg-icons/image/picture-as-pdf';
import InfoBox from '../components/dashboard/InfoBox';
import MigrationChart from '../components/dashboard/MigrationChart';
import MigrationList from '../components/dashboard/MigrationList';
import AlertErrorOutline from 'material-ui/svg-icons/alert/error-outline';
import ActionDone from 'material-ui/svg-icons/action/done';
import globalStyles from '../styles';
import PouchDBService from '../services/pouchdb-service'

const pouchDB = new PouchDBService("http://127.0.0.1:5984/centro-documentacion/")

class DashboardPage extends React.Component {

     constructor(props) {
       super(props);
       this.state = {
         folders: {
           uploaded: {},
           notUploaded: {}
         },
         files: {
           uploaded: {},
           notUploaded: {}
         }
       };
       pouchDB.on('changed', () => this.refreshTodos())
     }

     componentDidMount(){
       this.refreshTodos()
     }

     refreshTodos () {
       pouchDB.getFiles(true).then((response) => {
         response = response.docs
         let uploaded =  [];
         let notUploaded = [];
         response.map((value) => {
            let file = value;
            if (file.migrated) uploaded.push(file);
            if (!file.migrated) notUploaded.push(file);
         });
         this.setState({folders: {uploaded: uploaded, notUploaded: notUploaded}});
       })

       pouchDB.getFiles(false).then((response) => {
         response = response.docs
         let uploaded =  [];
         let notUploaded = [];
         response.map((value) => {
            let file = value;
            if (file.migrated) uploaded.push(file);
            if (!file.migrated) notUploaded.push(file);
         });
         this.setState({files: {uploaded: uploaded, notUploaded: notUploaded}});
       })
      }

     mergeFilesAndFolders(files, folders) {
       let output = [];
       Object.keys(folders.uploaded).map((key) => {
         output.push(folders.uploaded[key]);
       });
       Object.keys(folders.notUploaded).map((key) => {
         output.push(folders.notUploaded[key]);
       });
       Object.keys(files.uploaded).map((key) => {
         output.push(files.uploaded[key]);
       });
       Object.keys(files.notUploaded).map((key) => {
         output.push(files.notUploaded[key]);
       });
       return output;
     }

     render() {
       let foldersProcess = [
         {name: 'Migrados', value: this.state.folders.uploaded.length, color: cyan600,  icon: <ActionDone/>},
         {name: 'No migrados', value: this.state.folders.notUploaded.length, color: pink600,  icon: <AlertErrorOutline/>}
       ];
       let filesProcess = [
         {name: 'Migrados', value: this.state.files.uploaded.length, color: cyan600,  icon: <ActionDone/>},
         {name: 'No migrados', value: this.state.files.notUploaded.length, color: pink600,  icon: <AlertErrorOutline/>}
       ];
       let filesAndFolders = this.mergeFilesAndFolders(this.state.files, this.state.folders);

       let totalFolders = this.state.folders.uploaded.length + this.state.folders.notUploaded.length;
       let totalFiles = this.state.files.uploaded.length + this.state.files.notUploaded.length;

        return (
          <div>
            <h3 style={globalStyles.navigation}>Aplicación / Panel</h3>

            <div className="row">

              <div className="col-xs-24 col-sm-12 col-md-6 col-lg-6 m-b-30 ">
                <InfoBox Icon={ImagePictureAsPdf}
                         color={pink600}
                         title="Total de archivos"
                         value={totalFiles.toString()}
                />
              </div>


              <div className="col-xs-24 col-sm-12 col-md-6 col-lg-6 m-b-30 ">
                <InfoBox Icon={EditorAttachFile}
                         color={cyan600}
                         title="Total de anexos"
                         value={totalFolders.toString()}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
                <MigrationChart data={filesProcess} title="Archivos"/>
              </div>

              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
                <MigrationChart data={foldersProcess} title="Anexos"/>
              </div>
            </div>

          <div className="row">
            <div className="col-xs-24 col-sm-24 col-md-12 col-lg-12 m-b-30 ">
              <MigrationList data={filesAndFolders}/>
            </div>
          </div>
        </div>
       );
    }
}

export default DashboardPage;
