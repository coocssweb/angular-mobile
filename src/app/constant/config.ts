
function getDomain(domain: any){
  return domain.config.domain
}

export const DOMAIN = getDomain(window)

function getQiniuDomain(domain: any){
  return domain.config.qiniuDomain
}

export const QINIU_DOMAIN = getQiniuDomain(window)
