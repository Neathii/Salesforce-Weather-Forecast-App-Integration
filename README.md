# Weather Forecast App 🌤️  

A Salesforce Lightning Web Component (LWC) application that integrates with an external Weather API using Apex REST callouts and Named Credentials. The app fetches real-time weather data, allows saving forecasts asynchronously with Queueable Apex, and displays stored weather reports in a Lightning Data Table.  

---

## 🚀 Features  

- 🌍 **Real-Time Weather Data**  
  - Fetches weather details from an external API via Apex REST callouts.  
  - Uses **Named Credential + External Credentials** for secure authentication.  

- ⚡ **Async Save to Salesforce**  
  - Implemented **Queueable Apex** to save weather data asynchronously.  
  - Keeps the UI responsive while records are inserted.  

- 🔗 **REST Resource Extension**  
  - Designed a separate **REST Resource class** for handling POST requests (future-ready).  

- 🔔 **Toast Notifications**  
  - Displays success/error messages in LWC after operations.  

- 📊 **Data Table Display**  
  - Shows saved weather reports in a Lightning Data Table within the same component.  

- 🛠️ **Utility Bar Component**  
  - Packaged as a Utility Bar component for easy access inside Salesforce Lightning Apps.  

---

## 🛠️ Tech Stack  

- **Salesforce Apex** (REST Callouts, Queueable, REST Resource)  
- **Lightning Web Components (LWC)**  
- **Named Credentials + External Credentials**  
- **Utility Bar Configuration**  

---
