function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Note Taking App');
}

function saveNote(noteData) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Notes');
  
  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet('Notes');
    sheet.getRange('A1:G1').setValues([['Timestamp', 'Title', 'Note', 'Category', 'Priority', 'Tags', 'Created By']]);
    sheet.getRange('A1:G1').setFontWeight('bold');
  }
  
  // Input validation
  if (!noteData.title || !noteData.note) {
    return { success: false, message: 'Title and Note are required.' };
  }
  
  // Save note to sheet
  const timestamp = new Date();
  const userEmail = Session.getActiveUser().getEmail();
  sheet.appendRow([
    timestamp,
    noteData.title,
    noteData.note,
    noteData.category,
    noteData.priority,
    noteData.tags,
    userEmail
  ]);
  
  return { success: true, message: 'Note saved successfully!' };
}

function getNotes(searchTerm, categoryFilter, priorityFilter) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Notes');
  if (!sheet) return [];
  
  const data = sheet.getDataRange().getValues();
  const notes = [];
  
  // Skip header row
  for (let i = 1; i < data.length; i++) {
    const note = {
      timestamp: Utilities.formatDate(data[i][0], Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss'),
      title: data[i][1],
      note: data[i][2],
      category: data[i][3],
      priority: data[i][4],
      tags: data[i][5],
      createdBy: data[i][6]
    };
    
    // Apply filters
    let matches = true;
    if (searchTerm && searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      matches = note.title.toLowerCase().includes(term) || note.note.toLowerCase().includes(term) || note.tags.toLowerCase().includes(term);
    }
    if (categoryFilter && categoryFilter !== 'All') {
      matches = matches && note.category === categoryFilter;
    }
    if (priorityFilter && priorityFilter !== 'All') {
      matches = matches && note.priority === priorityFilter;
    }
    
    if (matches) {
      notes.push(note);
    }
  }
  
  // Sort by timestamp (newest first)
  return notes.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

function getCategories() {
  return ['Work', 'Personal', 'Project', 'Other'];
}

function getPriorities() {
  return ['Low', 'Medium', 'High'];
}