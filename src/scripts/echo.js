setTimeout(() => {
  console.info('ECHO ARGV', process.argv.pop())
  console.info('ECHO COMPLETE')
  process.exit(0)
}, 3000)
