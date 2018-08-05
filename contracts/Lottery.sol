pragma solidity ^0.4.17;

contract Lottery{
    //定义管理员
    address public manager;
    //存储玩家
    address[] public players;
    //定义幸运玩家
    address public winner;

    //构造函数
    function Lottery() public{
        manager=msg.sender;//以当前发送者为管理员
    }

    //获取管理员地址的方法
    function getManager() public view returns (address){
        return manager;
    }

    //投注彩票
    function enter() public payable{        //payable表示此函数与钱有关,有转账产生
        //投注1 ether才算投注成功
        require(msg.value==1 ether);
        //存入此投注者
        players.push(msg.sender);
    }

    //查询所有投注人
    function getAllPlayers() public view returns (address[]){
        return players;
    }

    //查询余额
    function getBalance() public  view returns (uint){
        return this.balance;
    }

    //查询投注人数
    function getPlayersCount() public view returns (uint){
        return players.length;
    }

    //随机算法
    function random() private view returns (uint){
        //区块难度(与算力有关)+动态时间+投注者一起生成sha256值
        return uint(keccak256(block.difficulty,now,players));
    }

    //随机产生幸运玩家方法(仅限管理员所有的功能)
    function pickWinner() public onlyManagerCanCall {
        //获取角标
        uint index=random() % players.length;
        winner = players[index];
        //投注者清空(0)指定存储的角标,
        players = new address[](0);
        //将奖池余额转账给幸运玩家
        winner.transfer(this.balance);
    }

    //投注无效原数返还投注资金(仅限管理员所有的功能)
    function refund() public onlyManagerCanCall{
        for(uint i=0;i<players.length;i++){
            players[i].transfer(1 ether);
        }
        //清空玩家数组
        players=new address[](0);
    }

    //定义仅管理员所有的权限
    modifier onlyManagerCanCall(){
        require(msg.sender==manager);
        _;
    }

}