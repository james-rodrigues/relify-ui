import React, { useRef, useState } from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Divider,
  Paper,
  TextField,
} from '@mui/material';
import {
  FormatBold as BoldIcon,
  FormatItalic as ItalicIcon,
  FormatUnderlined as UnderlineIcon,
  ContentCut as CutIcon,
  ContentCopy as CopyIcon,
  ContentPaste as PasteIcon,
  FormatListBulleted as BulletListIcon,
  FormatListNumbered as NumberListIcon,
} from '@mui/icons-material';
import './styles.scss';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Enter text...",
  rows = 6
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedText, setSelectedText] = useState('');

  // Get current selection from textarea
  const getSelection = () => {
    const textarea = textAreaRef.current;
    if (!textarea) return { start: 0, end: 0, text: '' };
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value.substring(start, end);
    
    return { start, end, text };
  };

  // Insert text at current cursor position or replace selection
  const insertText = (newText: string, replaceSelection = true) => {
    const textarea = textAreaRef.current;
    if (!textarea) return;

    const { start, end } = getSelection();
    const currentValue = textarea.value;
    
    let newValue;
    if (replaceSelection) {
      newValue = currentValue.substring(0, start) + newText + currentValue.substring(end);
    } else {
      newValue = currentValue.substring(0, start) + newText + currentValue.substring(start);
    }
    
    onChange(newValue);
    
    // Set cursor position after inserted text
    setTimeout(() => {
      const newPosition = start + newText.length;
      textarea.setSelectionRange(newPosition, newPosition);
      textarea.focus();
    }, 0);
  };

  // Wrap selected text with formatting
  const wrapText = (prefix: string, suffix: string = prefix) => {
    const { start, end, text } = getSelection();
    if (text) {
      const wrappedText = `${prefix}${text}${suffix}`;
      insertText(wrappedText, true);
    } else {
      // If no selection, insert the markers and place cursor between them
      const placeholder = `${prefix}text${suffix}`;
      insertText(placeholder, false);
      setTimeout(() => {
        const textarea = textAreaRef.current;
        if (textarea) {
          textarea.setSelectionRange(start + prefix.length, start + prefix.length + 4);
          textarea.focus();
        }
      }, 0);
    }
  };

  // Handle formatting actions
  const handleBold = () => wrapText('**');
  const handleItalic = () => wrapText('*');
  const handleUnderline = () => wrapText('<u>', '</u>');
  
  const handleBulletList = () => {
    const { start, end, text } = getSelection();
    if (text) {
      const lines = text.split('\n');
      const bulletLines = lines.map(line => line.trim() ? `• ${line}` : line);
      insertText(bulletLines.join('\n'), true);
    } else {
      insertText('• ');
    }
  };

  const handleNumberedList = () => {
    const { start, end, text } = getSelection();
    if (text) {
      const lines = text.split('\n');
      const numberedLines = lines.map((line, index) => 
        line.trim() ? `${index + 1}. ${line}` : line
      );
      insertText(numberedLines.join('\n'), true);
    } else {
      insertText('1. ');
    }
  };

  const handleCut = async () => {
    const { text } = getSelection();
    if (text) {
      try {
        await navigator.clipboard.writeText(text);
        insertText('', true);
      } catch (err) {
        console.error('Failed to cut text:', err);
      }
    }
  };

  const handleCopy = async () => {
    const { text } = getSelection();
    if (text) {
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        console.error('Failed to copy text:', err);
      }
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      insertText(text, false);
    } catch (err) {
      console.error('Failed to paste text:', err);
    }
  };

  const handleSelectionChange = () => {
    const { text } = getSelection();
    setSelectedText(text);
  };

  return (
    <Box className="rich-text-editor">
      <Paper className="toolbar" elevation={1}>
        <Box className="toolbar-group">
          <Tooltip title="Bold">
            <IconButton size="small" onClick={handleBold}>
              <BoldIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Italic">
            <IconButton size="small" onClick={handleItalic}>
              <ItalicIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Underline">
            <IconButton size="small" onClick={handleUnderline}>
              <UnderlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        
        <Divider orientation="vertical" flexItem />
        
        <Box className="toolbar-group">
          <Tooltip title="Cut">
            <IconButton 
              size="small" 
              onClick={handleCut}
              disabled={!selectedText}
            >
              <CutIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Copy">
            <IconButton 
              size="small" 
              onClick={handleCopy}
              disabled={!selectedText}
            >
              <CopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Paste">
            <IconButton size="small" onClick={handlePaste}>
              <PasteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        
        <Divider orientation="vertical" flexItem />
        
        <Box className="toolbar-group">
          <Tooltip title="Bullet List">
            <IconButton size="small" onClick={handleBulletList}>
              <BulletListIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Numbered List">
            <IconButton size="small" onClick={handleNumberedList}>
              <NumberListIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>
      
      <TextField
        inputRef={textAreaRef}
        multiline
        rows={rows}
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onSelect={handleSelectionChange}
        placeholder={placeholder}
        variant="outlined"
        className="rich-textarea"
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '0 0 8px 8px',
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#667eea',
              },
            },
          },
        }}
      />
    </Box>
  );
};

export default RichTextEditor;
