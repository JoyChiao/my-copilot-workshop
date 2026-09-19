![工作坊完成徽章](https://img.shields.io/badge/GitHub_Copilot_實戰工作坊-已完成-1F883D?style=for-the-badge&logo=githubcopilot&logoColor=white)

# 待辦清單 Web App

這是一個在 GitHub Copilot 實戰工作坊中完成的待辦清單 Web App。專案以簡潔的介面協助使用者管理日常待辦事項，並示範如何運用 GitHub Copilot 的 Agent Mode、MCP 與 agentic workflow 完成前端功能開發。

## 線上展示

[待辦清單](https://joychiao.github.io/my-copilot-workshop/)

## 功能

- 新增待辦事項。
- 輸入空白內容時不會新增項目。
- 勾選待辦事項後標記為已完成，文字會加上刪除線並淡化。
- 逐筆刪除待辦事項。
- 顯示整體清單的未完成項目數量。
- 清單為空時顯示提示文字。
- 使用 `localStorage` 保存待辦資料，重新整理後仍可保留。
- 在淺色模式與深色模式之間切換，並保存使用者的主題偏好。
- 使用者沒有手動選擇主題時，跟隨作業系統的 `prefers-color-scheme` 設定。
- 依「全部」、「未完成」或「已完成」篩選待辦事項。
- 篩選結果為空時顯示對應提示，並說明項目沒有被刪除。
- 使用確認對話框一次清除所有已完成項目。
- 沒有已完成項目時停用「清除已完成」按鈕。
- 支援手機螢幕的 RWD 版面。

## 技術

- 使用純 HTML、CSS 與原生 JavaScript。
- 不使用任何前端框架或套件。
- 不引用外部 CDN，可離線開啟與操作。
- 使用 CSS 變數集中管理介面配色。
- 使用 `localStorage` 保存待辦資料與主題偏好。

## 開發方式

- 使用 GitHub Copilot Agent Mode，依照需求逐步探索程式碼、規劃修改、實作功能並執行驗證。
- 使用 MCP 讀取 Microsoft Learn 官方文件，參考 `prefers-color-scheme` 與網頁無障礙色彩對比建議。
- 使用 GitHub MCP 讀取 Issue、建立修正分支、推送修改並建立 Pull Request。
- 使用 `.github/prompts/fix-issue.prompt.md` 定義 agentic workflow，將 Issue 讀取、計畫確認、修改、驗證、提交、推送與開 PR 串成固定流程。
- 透過 GitHub Issue #3 與 #4 實際處理篩選提示與批次清除功能，並在 PR 中記錄驗證方式。

## 我學到什麼

- 如何使用 Agent Mode 將需求拆成可驗證的小步驟，並在修改前確認實作計畫。
- 如何透過 MCP 查詢官方文件，將外部建議轉換成實際的 CSS 與無障礙檢查方向。
- 如何使用 `localStorage` 保存前端狀態，並處理主題偏好與待辦資料的重新載入。
- 如何設計不改變原始資料的篩選功能，以及在篩選結果為空時提供清楚回饋。
- 如何透過 GitHub Issue、分支、提交與 Pull Request 管理功能修正流程。
