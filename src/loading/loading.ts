import { useSelector } from 'react-redux';

export const loading = () => {
  const { isLoading } = useSelector((state: any) => state.pokemon);
  const { status } = useSelector((state: any) => state.auth);
  const { isSaving } = useSelector((state: any) => state.notes);

  const loading = isLoading || status == 'checking' || isSaving;

  return loading;
};
