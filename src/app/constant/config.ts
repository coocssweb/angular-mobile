import {environment} from "../../environments/environment";
function getDomain(domain: any){
  return domain.config.domain
}

// export const DOMAIN = getDomain(window)
export const DOMAIN = environment.serverDomain

function getQiniuDomain(domain: any){
  return domain.config.qiniuDomain
}

// export const QINIU_DOMAIN = getQiniuDomain(window)
export const QINIU_DOMAIN = environment.qiniuDomain
