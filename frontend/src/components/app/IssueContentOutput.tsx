import React, { useCallback, useLayoutEffect, useRef } from 'react';

interface IssueContentOutputProps {
  value: string;
}

export const IssueContentOutput: React.FC<IssueContentOutputProps> = React.memo(({ value }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value]);

  const handleClick = useCallback((event: React.MouseEvent<HTMLTextAreaElement>) => {
    event.currentTarget.select();
  }, []);

  return (
    <textarea
      ref={textareaRef}
      className="issue-content-output"
      value={value}
      readOnly
      onClick={handleClick}
    />
  );
});

