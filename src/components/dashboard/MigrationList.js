import React from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import {pink600, cyan600, white, teal500, red600} from 'material-ui/styles/colors';
import {typography} from 'material-ui/styles';
import EditorAttachFile from 'material-ui/svg-icons/editor/attach-file';
import ImagePictureAsPdf from 'material-ui/svg-icons/image/picture-as-pdf';
import ActionDone from 'material-ui/svg-icons/action/done';
import ActionErrorOutline from 'material-ui/svg-icons/alert/error-outline';
import AutoComplete from 'material-ui/AutoComplete';

class MigrationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentWillReceiveProps(props){
    this.setState({items: props.data});
  }

  filterList(value) {
    this.setState({
      items: [
        value,
        value + value,
        value + value + value,
      ],
    });
    let updatedList = this.props.data;
    updatedList = updatedList.filter((item) => {
      let pageTitle = item.pageTitle.toLowerCase();
      let file = item.file.toLowerCase();
      let migrated = item.migrated;
      let matchTitle = pageTitle.search(value.toLowerCase()) !== -1;
      let matchFile = file.search(value.toLowerCase()) !== -1;
      let matchMigrated = '';
      if (event.target.value == 'error'){
        matchMigrated = migrated == false;
      }
      return matchTitle || matchFile || matchMigrated;
    });
    this.setState({items: updatedList});
  }

  getComponent(styles) {
    let render = null;
    if (this.state.items.length != 0) {
      render = <List>
        {this.state.items.slice(0,150).map(item =>
          <div key={item.pageTitle}>
            <ListItem
              leftAvatar={item.isAttachment ? <Avatar icon={<EditorAttachFile />} /> : <Avatar icon={<ImagePictureAsPdf />} />}
              primaryText={item.pageTitle}
              secondaryText={
                <p>
                  <h3>{item.file}</h3>
                </p>
              }
              secondaryTextLines={2}
              rightIconButton={item.migrated? <Avatar icon={<ActionDone />} size={30} style={{marginTop: 25}} backgroundColor={teal500}/>: <Avatar icon={<ActionErrorOutline />} size={30} style={{marginTop: 25}} backgroundColor={red600}/>}
            />
            <Divider inset={true} />
          </div>
        )}
      </List>;
    } else {
      render = <p style={styles.noResults}>No se encontraron resultados</p>;
    }
    return render;
  }

  render() {
    const styles = {
      subheader: {
        fontSize: 24,
        fontWeight: typography.fontWeightLight,
        backgroundColor: teal500,
        color: white
      },outsideContainer: {
        paddingLeft: 10,
        marginRight: 100000
      },noResults: {
        padding: 10
      }
    };

    let render = this.getComponent(styles);

    return (
      <div>
        <Paper>
          <Subheader style={styles.subheader}>Centro de documentaciones | Itaipu Binacional</Subheader>
          <AutoComplete
             style={styles.outsideContainer}
             hintText="Escriba 'error' para obtener los documentos no migrados"
             dataSource={this.state.items}
             onUpdateInput={this.filterList.bind(this)}
             floatingLabelText="Qué desea buscar?"
             fullWidth={true}
          />
          {render}
        </Paper>
      </div>
    );
  }
}

export default MigrationList;
