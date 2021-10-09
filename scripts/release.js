const args = require('minimist')(process.argv.slice(2))
const chalk = require('chalk')
const { prompt } = require('enquirer')
const execa = require('execa')

const isDryRun = args.dry

const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: 'inherit', ...opts })
const dryRun = (bin, args, opts = {}) =>
  console.log(chalk.blue(`[dryrun] ${bin} ${args.join(' ')}`), opts)
const runIfNotDry = isDryRun ? dryRun : run
const step = msg => console.log(chalk.cyan(msg))

Date.prototype.Format = function(formatStr)   
{   
    var str = formatStr;   
    var Week = ['日','一','二','三','四','五','六'];  
  
    str=str.replace(/yyyy|YYYY/,this.getFullYear());   
    str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));   
  
    str=str.replace(/MM/,this.getMonth()+1>9?(this.getMonth()+1).toString():'0' + this.getMonth()+1);   
    str=str.replace(/M/g,this.getMonth());   
  
    str=str.replace(/w|W/g,Week[this.getDay()]);   
  
    str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());   
    str=str.replace(/d|D/g,this.getDate());   
  
    str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());   
    str=str.replace(/h|H/g,this.getHours());   
    str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());   
    str=str.replace(/m/g,this.getMinutes());   
  
    str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());   
    str=str.replace(/s|S/g,this.getSeconds());   
  
    return str;   
}   

async function main() {
  let targetVersion = args._[0]
  let whereCK
  let now = new Date().Format('YYYY-MM-DD hh:mm:ss 星期W')

  if (!targetVersion) {
    const { release } = await prompt ({
      type: 'select',
      name: 'release',
      message: '是否更新发布到云端仓库',
      choices: ['是','否']
    })

    if (release === '是') {
      targetVersion = (
        await prompt({
          type: 'input',
          name: 'version',
          message: '请输入你的更新的内容',
          initial: now + ' 更新'
        })
      ).version
    } else {
      return
    }

    whereCK = await prompt ({
      type: 'select',
      name: 'whereCK',
      message: '发到哪个仓库',
      choices: ['全部','Github','Gitee']
    })
  }

  // commit 
  const { stdout } = await run('git', ['diff'], { stdio: 'pipe' })
  if (stdout) {
    step('\n提交更改的内容...')
    await runIfNotDry('git', ['add', '-A'])
    await runIfNotDry('git', ['commit', '-m', `${targetVersion}`])
  } else {
    console.log('No changes to commit.')
  }

  // 推送到 GitHub 和 Gitee
  step('\n推送到对应的仓库...')
  switch (whereCK.whereCK) {
    case '全部':
      await runIfNotDry('git', ['push', 'gitee', `main`])
      step('\n')
      await runIfNotDry('git', ['push', 'github', `main`])
      step('\n')
      break;
    case 'gitee':
      await runIfNotDry('git', ['push', 'gitee', `main`])
      step('\n')
      break;
    case 'github':
      await runIfNotDry('git', ['push', 'github', `main`])
      step('\n')
      break;
    default:
    break;
  } 

  if (isDryRun) {
    console.log(`\nDry run finished - run git diff to see package changes.`)
  } else {
    step('更新完成')
  }
}

main().catch(err => {
  console.error(err)
})
