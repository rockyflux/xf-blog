/**
 * 不蒜子阅读数统计
 * 
 * 不蒜子会自动更新带有 id="busuanzi_page_pv" 的元素
 * 无需通过 API 获取，直接返回 0，由不蒜子脚本自动更新显示
 * 
 * @param {string} id - 文章唯一标识（MD5值，不蒜子不需要）
 * @param {string} pageUrl - 页面URL（不蒜子不需要）
 * @param {function} call - 回调函数
 */
export const getArticleViewCount = (id, pageUrl, call) => {
  // 不蒜子会自动更新 HTML 元素，这里返回 0 作为初始值
  // 实际显示由不蒜子脚本自动更新
  call(0);
};

export default { getArticleViewCount }