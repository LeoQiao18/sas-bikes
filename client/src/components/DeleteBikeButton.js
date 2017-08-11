import React from 'react';
import { Popconfirm, Button, message } from 'antd';
import { connect } from 'react-redux';
import { deleteBike } from '../actions';

class DeleteBikeButton extends React.Component {
  confirm() {
    const hide = message.loading('Deleting the bike...', 0);
    this.props.deleteBike(this.props.bikeId, () => {
      hide();
      message.success('Bike deleted!');
    });
  }

  render() {
    return (
      <Popconfirm
        title="Are you sure delete this task?"
        onConfirm={this.confirm.bind(this)}
        okText="Yes"
        cancelText="No"
      >
        <Button style={{ marginTop: 8 }} icon="close" type="dashed">
          Delete
        </Button>
      </Popconfirm>
    );
  }
}

export default connect(null, { deleteBike })(DeleteBikeButton);
