//编译智能合约的脚本,传出编译后的bytecode,interface等内容
const path = require('path');
const fs = require('fs');
const solc = require('solc');

//根据contracts目录下查找到名为Lottery.sol的源文件路径
const srcpath = path.resolve(__dirname,'contracts','Lottery.sol');
//根据路径按utf-8格式读取文件
const source = fs.readFileSync(srcpath,'utf-8');
//sol编译器对编码后的文件进行编译
const result = solc.compile(source,1);
console.log(result);

//按key值导出编译后的内容
module.exports=result.contracts[':Lottery'];