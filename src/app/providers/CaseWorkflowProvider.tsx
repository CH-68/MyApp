import { createContext, useCallback, useContext, useMemo, useReducer, type ReactNode } from "react";
import { MOCK_COMPLIANCE_FAIL, MOCK_COMPLIANCE_PASS, MOCK_SUBMISSION } from "../data/mockData";
import type { ActiveTab, ComplianceStatus, ProcessingStage, TransactionType, UploadedFile, WorkflowState } from "../types";

type Action =
  | { type: "ADD_FILES"; files: UploadedFile[] }
  | { type: "REMOVE_FILE"; id: string }
  | { type: "SET_TRANSACTION_TYPE"; transactionType: TransactionType | "" }
  | { type: "SET_STAGE"; stage: ProcessingStage }
  | { type: "SET_ACTIVE_TAB"; activeTab: ActiveTab }
  | { type: "TOGGLE_RAW_JSON" }
  | { type: "SET_COPY_STATUS"; copied: boolean }
  | { type: "RESET" };

interface CaseWorkflowContextValue extends WorkflowState {
  compliance: { status: ComplianceStatus; score: number; checkedAt: string; passedChecks?: string[]; nextActions?: string[]; issues?: Array<{ code: string; description: string; recommendation: string }>; warnings?: string[] };
  isProcessing: boolean;
  canProcess: boolean;
  addFiles: (files: FileList | File[]) => void;
  removeFile: (id: string) => void;
  setTransactionType: (value: TransactionType | "") => void;
  setActiveTab: (tab: ActiveTab) => void;
  toggleRawJson: () => void;
  processCase: () => Promise<void>;
  copySubmission: () => Promise<void>;
  resetCase: () => void;
}

const initialState: WorkflowState = {
  files: [],
  transactionType: "",
  stage: "idle",
  activeTab: "extract",
  showRawJson: false,
  complianceMode: "pass",
  copied: false,
  caseId: "GOV-2024-08831",
};

function reducer(state: WorkflowState, action: Action): WorkflowState {
  switch (action.type) {
    case "ADD_FILES":
      return { ...state, files: [...state.files, ...action.files] };
    case "REMOVE_FILE":
      return { ...state, files: state.files.filter((file) => file.id !== action.id) };
    case "SET_TRANSACTION_TYPE":
      return { ...state, transactionType: action.transactionType };
    case "SET_STAGE":
      return { ...state, stage: action.stage };
    case "SET_ACTIVE_TAB":
      return { ...state, activeTab: action.activeTab };
    case "TOGGLE_RAW_JSON":
      return { ...state, showRawJson: !state.showRawJson };
    case "SET_COPY_STATUS":
      return { ...state, copied: action.copied };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const CaseWorkflowContext = createContext<CaseWorkflowContextValue | undefined>(undefined);

function createUploadedFiles(files: FileList | File[]): UploadedFile[] {
  return Array.from(files).map((file) => ({
    id: Math.random().toString(36).slice(2),
    name: file.name,
    size: file.size,
    type: file.type,
  }));
}

export function CaseWorkflowProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addFiles = useCallback((files: FileList | File[]) => {
    dispatch({ type: "ADD_FILES", files: createUploadedFiles(files) });
  }, []);

  const removeFile = useCallback((id: string) => {
    dispatch({ type: "REMOVE_FILE", id });
  }, []);

  const setTransactionType = useCallback((transactionType: TransactionType | "") => {
    dispatch({ type: "SET_TRANSACTION_TYPE", transactionType });
  }, []);

  const setActiveTab = useCallback((activeTab: ActiveTab) => {
    dispatch({ type: "SET_ACTIVE_TAB", activeTab });
  }, []);

  const toggleRawJson = useCallback(() => {
    dispatch({ type: "TOGGLE_RAW_JSON" });
  }, []);

  const resetCase = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  const processCase = useCallback(async () => {
    if (state.files.length === 0 || !state.transactionType) {
      return;
    }

    const stages: ProcessingStage[] = ["extracting", "drafting", "policy", "compliance", "done"];

    for (const stage of stages) {
      dispatch({ type: "SET_STAGE", stage });
      if (stage !== "done") {
        await new Promise((resolve) => window.setTimeout(resolve, 900));
      }
    }

    dispatch({ type: "SET_ACTIVE_TAB", activeTab: "extract" });
  }, [state.files.length, state.transactionType]);

  const copySubmission = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(MOCK_SUBMISSION);
      dispatch({ type: "SET_COPY_STATUS", copied: true });
      window.setTimeout(() => dispatch({ type: "SET_COPY_STATUS", copied: false }), 1800);
    } catch {
      dispatch({ type: "SET_COPY_STATUS", copied: false });
    }
  }, []);

  const compliance = useMemo(
    () => (state.complianceMode === "pass" ? MOCK_COMPLIANCE_PASS : MOCK_COMPLIANCE_FAIL),
    [state.complianceMode],
  );

  const value = useMemo<CaseWorkflowContextValue>(
    () => ({
      ...state,
      compliance,
      isProcessing: state.stage !== "idle" && state.stage !== "done",
      canProcess: state.files.length > 0 && Boolean(state.transactionType) && state.stage !== "extracting" && state.stage !== "drafting" && state.stage !== "policy" && state.stage !== "compliance",
      addFiles,
      removeFile,
      setTransactionType,
      setActiveTab,
      toggleRawJson,
      processCase,
      copySubmission,
      resetCase,
    }),
    [state, compliance, addFiles, removeFile, setTransactionType, setActiveTab, toggleRawJson, processCase, copySubmission, resetCase],
  );

  return <CaseWorkflowContext.Provider value={value}>{children}</CaseWorkflowContext.Provider>;
}

export function useCaseWorkflow() {
  const context = useContext(CaseWorkflowContext);
  if (!context) {
    throw new Error("useCaseWorkflow must be used within a CaseWorkflowProvider");
  }
  return context;
}
