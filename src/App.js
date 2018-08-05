import React, { Component } from 'react';
import { Container,  Header,Icon,Image,Card,Button,Statistic,Label} from 'semantic-ui-react';
import web3 from "./web3";
import lottery from './lottery'

class App extends Component {
    state={
        manager:'',
        playersCount:0,
        balance:0,
        loading:false,
        showbutton:'none'
    };

    async componentDidMount(){
        const address = await lottery.methods.getManager().call();
        const playersCount = await lottery.methods.getPlayersCount().call();
        const balance = await lottery.methods.getBalance().call();
        this.setState({
            manager: address,
            playersCount:playersCount,
            balance:web3.utils.fromWei(balance,'ether')
        });
        const accounts = await web3.eth.getAccounts();
        if(accounts[0]===address){
            this.setState({showbutton:'inline'});
        }else {
            this.setState({showbutton: 'none'});
        }
    }

    enter=async()=>{
        this.setState({loading:true});
        const accounts = await web3.eth.getAccounts();
        await lottery.methods.enter().send({
            from:accounts[0],
            value:'1000000000000000000'
        });
        this.setState({loading:false});
        window.location.reload(true);
    };

    pickWinner=async()=>{
        this.setState({loading:true});
        const accounts = await web3.eth.getAccounts();
        await lottery.methods.pickWinner().send({
            from:accounts[0]
        });
        this.setState({loading:false});
        window.location.reload();
    };

    refund=async()=>{
        this.setState({loading:true});
        const accounts = await web3.eth.getAccounts();
        await lottery.methods.refund().send({
            from:accounts[0]
        });
        this.setState({loading:false});
        window.location.reload();
    };

  render() {
    return (
     <Container>
             <Header as='h2' icon textAlign='center'>
                 <Icon name='users' circular />
                 <Header.Content>黑马区块链彩票</Header.Content>
             </Header>
         <Card>
             <Image src='../images/logo.jpg' />
             <Card.Content>
                 <Card.Header>六合彩</Card.Header>
                 <Card.Meta>
                     <p>管理员</p>
                     <Label size='mini' color='red'>
                         {this.state.manager}
                     </Label>
                 </Card.Meta>
                 <Card.Description>每晚十点,不见不散</Card.Description>
             </Card.Content>
             <Card.Content extra>
                 <a><Icon name='user' />{this.state.playersCount}人参与</a>
             </Card.Content>
             <Card.Content extra>
                 <Statistic horizontal color='red'>
                     <Statistic.Value>{this.state.balance}</Statistic.Value>
                     <Statistic.Label>Ether</Statistic.Label>
                 </Statistic>
             </Card.Content>
             <Button animated='fade' color='green' onClick={this.enter} loading={this.state.loading} disabled={this.state.loading}>
                 <Button.Content visible>
                     赢&nbsp;&nbsp;&nbsp;<Icon name='money' />&nbsp;&nbsp;Money
                 </Button.Content>
                 <Button.Content hidden>
                     娶&nbsp;&nbsp;<Icon name='lesbian' />Girls
                 </Button.Content>
             </Button>
             <Card.Content extra style={{display:this.state.showbutton}}>
                 <div className='ui two buttons'>
                     <Button basic color='green' style={{display:this.state.showbutton}} onClick={this.pickWinner} loading={this.state.loading}>开奖</Button>
                     <Button basic color='red' style={{display:this.state.showbutton}} onClick={this.refund} loading={this.state.loading}>退款</Button>
                 </div>
             </Card.Content>
         </Card>
     </Container>
    );
  }
}

export default App;
