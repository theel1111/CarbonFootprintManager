import styled from "styled-components";

const Container = styled.div`
    padding: 16px;
    max-width: 400px;
    margin: 0 auto;
`;

const Section = styled.div`
    margin-bottom: 16px;
`;

const Button = styled.button`
    padding: 4px 12px;
    margin-top: 4px;
    margin-bottom: 4px;
    margin-right: 2px;
    cursor: pointer;
    background-color: #3B82F6; /* blue-500 */
    color: white;
    border: none;
    border-radius: 4px;
`;

const DeleteButton = styled.button`
    padding: 4px 12px;
    margin-top: 4px;
    margin-bottom: 4px;
    margin-right: 2px;
    cursor: pointer;
    background-color: #EF4444; /* red-500 */
    color: white;
    border: none;
    border-radius: 4px;
`;

const ItemBox = styled.div`
    border: 1px solid #ccc;
    margin-bottom: 8px;
    border-radius: 4px;
`;

const ItemHeader = styled.div`
    padding: 2px 10px;
    background: #f0f0f0;
    cursor: pointer;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Label = styled.label`
    font-size: 14px;
    font-weight: bold;
    margin-right: 8px;
    color: ${(props) => props.theme.textPrimary};
`;

const ItemContent = styled.div<{ expanded: boolean }>`
    padding: 8px;
    display: ${(props) => (props.expanded ? "block" : "none")};
`;

const Select = styled.select`
    width: 100%;
    padding: 4px;
    margin-top: 8px;
    margin-bottom: 8px;
    border: 1px solid #ccc;
`;

const Input = styled.input`
    width: calc(100% - 8px);
    padding: 4px;
    margin-bottom: 8px;
    border: 1px solid #ccc;
`;

const SubmitButton = styled.button`
    display: block;
    margin: 24px auto 0;
    padding: 8px 16px;
    background: #f0f0f0;
    border: #ccc 1px solid;
    border-radius: 6px;
    color: #333;
    font-weight: bold;
    cursor: pointer;
`;

export {
    Container,
    Section,
    Button,
    DeleteButton,
    ItemBox,
    ItemHeader,
    Label,
    ItemContent,
    Select,
    Input,
    SubmitButton,
};