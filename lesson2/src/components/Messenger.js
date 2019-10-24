import React from 'react';
import PropTypes from 'prop-types';

import MessageService from '../services/MessageService';

class Messenger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      sender: '',
      topicInpt: this.props.topics[0]
    };

    this.onChange = this.onChange.bind(this);
    this.send = this.send.bind(this);
    this.listenToMessagesFromOtherWindows = this.listenToMessagesFromOtherWindows.bind(this);
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  send(e) {
    MessageService.send(this.state.topicInpt, this.state.messageInpt);
    e.preventDefault();
  }

  listenToMessagesFromOtherWindows(message,sender) {
    this.setState({
      message: JSON.stringify(message),
      sender: sender
    })
  }

  componentDidMount() {
    console.log("subscribing to topics " + this.props.topics);
    this.props.topics.forEach((V)=> MessageService.subscribe(V,this.listenToMessagesFromOtherWindows) )
  }

  componentWillUnmount() {
    this.props.topics.forEach((V)=> MessageService.unsubscribe(V,this.listenToMessagesFromOtherWindows) )
  }

  render() {

    let options = this.props.topics.map((data) =>
                <option 
                    key={data}
                    value={data}
                >
                    {data}
                </option>
            );

    return (
      <div>
        <div>
          last message  {this.state.message}<br/>
          sender {this.state.sender}<br/>
        </div>
        <hr />
        <div>
          Enter message
          <input type="text" name="messageInpt" onChange={this.onChange}/>
          
          Enter topic
          <select name="topicInpt" value={this.state.topicInpt} onChange={this.onChange}>
                {options}
           </select>
            
          Enter target window  
          <input type="text" name="targetInpt" onChange={this.onChange}/>
          <button onClick={this.send}>Send</button>
        </div>
      </div>
    );
  }

}


Messenger.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.string).isRequired,
  windowid: PropTypes.string.isRequired
};

export default Messenger;